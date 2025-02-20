import { createSafeActionClient } from "next-safe-action";
import {z} from 'zod';
import * as Sentry from '@sentry/nextjs'
import { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient(
    {
        defineMetadataSchema(){
            return z.object({
                actionName:z.string(),
            })
        },
        handleServerError(e,utils){
            const {clientInput,metadata}=utils

            if(e.constructor.name==="NeonDbError"){
                const {code,detail}=e as NeonDbError
                if(code==='23505'){
                    return`unique entry required. ${detail}`
                }
                
            }

            Sentry.captureException(e,(scope)=>{
                scope.clear()
                scope.setContext('serverError',{message:e.message})
                scope.setContext('metaData',{actionName:metadata?.actionName})
                scope.setContext('clientInput',{clientInput})
                return scope
            })
            if(e.constructor.name==="NeonDbError"){
                return  "database Error: Your data did not save"
            }
            return e.message
        }
    }
);
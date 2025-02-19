import { BackButton } from "@/components/BackButton"
import { ApiError } from "@/lib/ApiError"
import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {Users,init as kindeInit} from "@kinde/management-api-js"

export async function generateMetaData(
    {searchParams}:{searchParams:Promise<{[key:string]:string|undefined}>}
){
    const {customerId,ticketId}=await searchParams
    if(!customerId && !ticketId){
        return {title:"Missing customer ID or Ticket ID"}
    }
    if(customerId) return {title:`new ticket for customer #${customerId}`}

    if(ticketId) return {title:`Edit Ticket #${ticketId}`}
}

export default async function TicketFormPage({searchParams}:{searchParams:Promise<{[key:string]:string|undefined}>}) {
    try {
        const {customerId,ticketId}=await searchParams
        if(!customerId && !ticketId){
            return(
                <>
                <h2 className="text-2xl mb-2">TicketID or CustomerID is required to load ticket</h2>
                <BackButton title="Go Back" variant='default'/>
                </>
            )
        }

        const {getPermission,getUser}=getKindeServerSession()
        const[managerPermission,user]=await Promise.all([
            getPermission("manager"),
            getUser(),
        ])
        const isManager=managerPermission?.isGranted
        //new ticket form
        if(customerId){
            const customer=await getCustomer(parseInt(customerId))
            if(!customer){
                return(
                    <>
                    <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                    <BackButton title="Go Back" variant='default'/>
                    </>
                )
            }

            if(!customer.active){
                return(
                    <>
                    <h2 className="text-2xl mb-2">Customer ID #{customerId} not active</h2>
                    <BackButton title="Go Back" variant='default'/>
                    </>
                )
            }
            //return ticket form
            if(isManager){
                kindeInit()
                const {users}=await Users.getUsers()
                const techs=users?users.map(user=>({id:user.email!,description:user.email!})):[]
                return <TicketForm customer={customer} techs={techs}/>
            }
            else{
                return <TicketForm customer={customer}/>
            }
            
        }
        //edit ticket
        if(ticketId){
            const ticket=await getTicket(parseInt(ticketId))
            if(!ticket){
                return(
                    <>
                    <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
                    <BackButton title="Go Back" variant='default'/>
                    </>
                )
            }
            const customer=await getCustomer(ticket.customerId)

            //reutrn ticket form
            if(isManager){
                kindeInit()
                const {users}=await Users.getUsers()
                const techs=users?users.map(user=>({id:user.email!,description:user.email!})):[]
                return <TicketForm customer={customer} ticket={ticket} techs={techs}/>
            }
            else{
                const isEditable=user.email?.toLowerCase()===ticket.tech.toLowerCase()
                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable}/>
            }
            
        }
        
        
    } catch (error) {
        if(error instanceof Error){
            Sentry.captureException(error)
            throw new ApiError(500,"unexpected error has occured")
        }
    }
}
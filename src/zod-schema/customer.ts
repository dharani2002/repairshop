import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import {customers} from "@/db/schema"

export const insertCustomerSchema=createInsertSchema(customers,{
    firstName:(schema)=>schema.min(1,"First name is required"),
    lastName:(schema)=>schema.min(1,"last name is required"),
    address1:(schema)=>schema.min(1,"Address is required"),
    city:(schema)=>schema.min(1,"city is required"),
    state:(schema)=>schema.length(2,"state must be exactly 2 characters"),
    zip:(schema)=>schema.regex(/^\d{5}(-\d{4})?$/,"invalid zip code use XXXXX or XXXXX-XXXX"),
    email:(schema)=>schema.email("invalid email address"),
    phone:(schema)=>schema.regex(/^\d{3}-\d{3}-\d{4}$/,"invalid phone number format use XXX-XXX-XXXX"), 
})

export const selectCustomerSchema=createSelectSchema(customers)

export type insertCustomerSchemaType=typeof insertCustomerSchema._type
export type selectCustomerSchemaType=typeof selectCustomerSchema._type
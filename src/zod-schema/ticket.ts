import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import {tickets} from "@/db/schema"
import {z} from "zod"

export const insertTicketSchema=createInsertSchema(tickets,{
    id:z.union([z.number(),z.literal("(New)")]),
    title:(schema)=>schema.min(1,"title is required"),
    description:(schema)=>schema.min(1,"description is required"),
    tech:(schema)=>schema.email("invalid email address")
})

export const selectTicketSchema=createSelectSchema(tickets)

export type insertTicketSchemaType=typeof insertTicketSchema._type
export type selectTicketSchemaType=typeof selectTicketSchema._type
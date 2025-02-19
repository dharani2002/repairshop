import { db } from "@/db";
import { tickets,customers } from "@/db/schema";
import { eq,ilike,or } from "drizzle-orm";

export async function getTicketSearchResults(searchText:string){
    const results=await db.select({
        ticketDate:tickets.createdAt,
        title:tickets.title,
        firstName:customers.firstName,
        lastName:customers.lastName,
        email:customers.email,
        tech:tickets.tech,
    })
        .from(tickets)
        .leftJoin(customers,eq(tickets.customerId,customers.id))
        .where(or(
            ilike(tickets.title,`%${searchText}%`),
            ilike(tickets.description,`%${searchText}%`),
            ilike(tickets.tech,`%${searchText}%`),
            ilike(customers.firstName,`%${searchText}%`),
            ilike(customers.lastName,`%${searchText}%`),
            ilike(customers.email,`%${searchText}%`),
        ))
    
    return results
}
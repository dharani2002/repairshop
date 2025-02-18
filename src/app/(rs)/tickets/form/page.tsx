import { BackButton } from "@/components/BackButton"
import { ApiError } from "@/lib/ApiError"
import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm"
import { tickets } from "@/db/schema"

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
            return <TicketForm customer={customer}/>
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
            console.log("ticket: ",ticket)
            console.log("customer: ",customer)
            return <TicketForm customer={customer} ticket={ticket}/>
        }
        
        
    } catch (error) {
        if(error instanceof Error){
            Sentry.captureException(error)
            throw new ApiError(500,"unexpected error has occured")
        }
    }
}
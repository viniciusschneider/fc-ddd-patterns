import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class ChangeAddressHandler implements EventHandlerInterface<ChangeAddressEvent> {

  handle({ eventData: { address, id, name } }: ChangeAddressEvent): void {
    const addressString = `${address.city}, ${address.street}, ${address.number}, ${address.zip}`
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${addressString}`); 
  }
}

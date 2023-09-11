import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

interface ChangeAddressEventInterface {
  id: string;
  name: string;
  address: Address;
}

export default class ChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: ChangeAddressEventInterface;

  constructor(eventData: ChangeAddressEventInterface) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

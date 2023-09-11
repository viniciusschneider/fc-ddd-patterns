import EventDispatcher from "../../@shared/event/event-dispatcher";
import ChangeAddressEvent from "../event/change-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import ChangeAddressHandler from "../event/handler/change-address.handler";
import SendConsoleLogOneHandler from "../event/handler/send-console-log-one.handler";
import SendConsoleLogTwoHandler from "../event/handler/send-console-log-two.handler";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should notify all events when a customer is created", async () => {
    const eventDispatcher = new EventDispatcher();
    const handlerOne = new SendConsoleLogOneHandler();
    const handlerTwo = new SendConsoleLogTwoHandler();
    const spyEventHandlerOne = jest.spyOn(handlerOne, "handle");
    const spyEventHandlerTwo = jest.spyOn(handlerTwo, "handle");
    eventDispatcher.register(CustomerCreatedEvent.name, handlerOne);
    eventDispatcher.register(CustomerCreatedEvent.name, handlerTwo);

    const customer = Customer.create("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    
    const events = customer.getEventsByKey(CustomerCreatedEvent.name);
    events.forEach(event => {
      eventDispatcher.notify(event);
    })

    expect(spyEventHandlerOne).toHaveBeenCalled();
    expect(spyEventHandlerTwo).toHaveBeenCalled();
  });

  it("should notify all events when a customer address is updated", async () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new ChangeAddressHandler();
    const spyEventHandler = jest.spyOn(handler, "handle");
    eventDispatcher.register(ChangeAddressEvent.name, handler);

    const customer = Customer.create("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer.changeAddress(address2, true);
    
    const events = customer.getEventsByKey(ChangeAddressEvent.name);
    events.forEach(event => {
      eventDispatcher.notify(event);
    })

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

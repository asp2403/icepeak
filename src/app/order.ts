export interface Order {
    orderType: number;
    shop?: number;
    deliveryAddress?: string;
    contactData: {
        name: string;
        patronymic?: string;
        surname: string;
        phone: string;
        email: string;
    }

}
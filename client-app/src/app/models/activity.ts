
export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[]
}

// Partial<IActivity> make all properties in parent as optioanl in child
export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = null;
    time?: Date = null;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init)
    }
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean
}
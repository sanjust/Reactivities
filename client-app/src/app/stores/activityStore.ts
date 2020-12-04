import { observable, action, makeAutoObservable, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from '../../index';
import agent from "../api/agent";
import { createAttendee, setActivityProps } from "../common/util/util";
import { IActivity } from "../models/activity";
import { RootStore } from "./rootStore";

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable loading = false;
    @observable submitting = false;
    @observable target = null;

    @computed get activitiesByDate() {
        console.log(this.groupActivityByDate(Array.from(this.activityRegistry.values())));
        return this.groupActivityByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivityByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        const user = this.rootStore.userStore.user;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    setActivityProps(activity, user);
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        const user = this.rootStore.userStore.user;
        if (activity) {
            this.activity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    setActivityProps(activity, user);
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                })
                return activity;
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false
                })
                console.log(error);
            }
        }
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attend = createAttendee(this.rootStore.userStore.user);
            attend.isHost = true;
            let attendes = [];
            attendes.push(attend);
            activity.attendees = attendes;
            activity.isHost = true;
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
        }
    }

    @action deleteActivity = async (target: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = target.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                if (this.activity && this.activity.id === id) {
                    this.activity = null;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    @action attendActivity = async () => {
        const attendee = createAttendee(this.rootStore.userStore.user);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity.id);
            runInAction(() => {
                this.loading = false;
                if (this.activity) {
                    this.activity.attendees.push(attendee);
                    this.activity.isGoing = true;
                    this.activityRegistry.set(this.activity.id, this.activity);
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem signing up to activity');
        }
    }

    @action cancelAttendance = async () => {
        this.loading = true;
        try {
            await agent.Activities.unAttend(this.activity.id);
            runInAction(() => {
                this.loading = false;
                if (this.activity) {
                    if (this.activity) {
                        this.activity.attendees = this.activity.attendees.filter(val => val.username !== this.rootStore.userStore.user.username);
                        this.activity.isGoing = false
                        this.activityRegistry.set(this.activity.id, this.activity);
                    }
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem signing up to activity');
        }
    }
}
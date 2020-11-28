import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: 'always' });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = null;

    constructor() {
        makeAutoObservable(this);
    }

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
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

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.editMode = false;
            })
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.editMode = false;
            })
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
                if (this.selectedActivity && this.selectedActivity.id === id) {
                    this.selectedActivity = null;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.editMode = false;
            })
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action handleOpenCreateForm = () => {
        this.selectedActivity = null;
        this.editMode = true;
    }

    @action setEditMode = (mode: boolean) => {
        this.editMode = mode;
    }

    @action setSelectedActivity = (activity: IActivity | null) => {
        this.selectedActivity = activity;
    }
}
export default createContext(new ActivityStore());
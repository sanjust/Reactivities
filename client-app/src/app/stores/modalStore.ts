import { action, makeAutoObservable, observable } from "mobx";
import { RootStore } from "./rootStore";

export default class ModalStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    @observable modal = {
        open: false,
        body: null
    }

    @action openModel = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModel = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}
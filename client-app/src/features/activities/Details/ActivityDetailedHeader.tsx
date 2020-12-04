import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { format } from 'date-fns';
import { IActivity } from '../../../app/models/activity';
import { RootStoreContext } from '../../../app/stores/rootStore';


const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const rootStore = useContext(RootStoreContext);
    const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;

    return (
        <div>
            <Segment.Group>
                <Segment basic attached='top' style={{ padding: '0' }}>
                    <Image style={activityImageStyle} src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
                    <Segment basic style={activityImageTextStyle}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size='huge'
                                        content={activity.title}
                                        style={{ color: 'white' }}
                                    />
                                    <p>{format(activity.date, 'eeee do MMMM')}</p>
                                    <p>
                                        Hosted by <strong>Bob</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>
                <Segment clearing attached='bottom'>
                    {activity.isHost
                        ? (<Button color='orange' as={Link} to={`/manage/${activity.id}`} floated='right'>
                            Manage Event
                        </Button>) : activity.isGoing
                            ? (<Button loading={loading} onClick={cancelAttendance}>Cancel attendance</Button>) : (
                                <Button loading={loading} color='teal' onClick={attendActivity} >Join Activity</Button>)}

                </Segment>
            </Segment.Group>
        </div>
    )
}

export default observer(ActivityDetailedHeader)
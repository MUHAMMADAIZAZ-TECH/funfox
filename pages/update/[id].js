import { readTask } from '../../redux/features/taskSlice'
import { wrapper } from '../../redux/store'

import TaskUpdate from '../../components/TaskUpdate'
import UserDashboard from '@/components/Dashboard/UserDashboard';


export default function UpdateId() {
    return (<UserDashboard Component={TaskUpdate}/>)
}


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params, req }) => {
        const id = params.id
        await store.dispatch(readTask({ id, req }));
    }
);
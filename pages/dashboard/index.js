import { readTasks } from '../../redux/features/tasksSlice'
import { wrapper } from '../../redux/store'
import TasksList from '../../components/TasksList'
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CustomSnackbar } from '@/components/UI-Components';



export default function Index() {
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.clear(); // Clear all local storage
            router.push("/"); // Navigate to /next page after logout
        }
    };

    return (
        <div>
            <button onClick={handleLogout} style={{ position: "absolute", top: 10, right: 10 }}>
                Logout
            </button>
            <TasksList />
            <CustomSnackbar/>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ req, res }) => {
        await store.dispatch(readTasks({ req, res }));
    }
);

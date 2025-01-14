import useAuth from "../../../../hooks/useAuth";

const ManageProfile = () => {
    const {user} = useAuth()
    return (
        <div>
            {user?.email}
        </div>
    );
};

export default ManageProfile;
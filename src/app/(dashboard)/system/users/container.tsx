import { fetchUsersData } from "@/features/system/users/services/fetchUsers";
import UsersPresentational from "./presentational";


const UsersContainer = async () => {
    const { users, companies, roles } = await fetchUsersData();
    return <UsersPresentational users={users} companies={companies} roles={roles} />;
};

export default UsersContainer;

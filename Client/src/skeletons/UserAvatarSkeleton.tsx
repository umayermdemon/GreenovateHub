import { Avatar } from "@/components/ui/avatar";

const UserAvatarSkeleton = () => (
  <Avatar className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] cursor-pointer animate-pulse bg-gray-200">
    <div className="w-full h-full rounded-full bg-gray-300 border border-green-200" />
  </Avatar>
);

export default UserAvatarSkeleton;

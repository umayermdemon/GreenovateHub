import GerneralInfoForm from "@/components/modules/Settings/GerneralInfoForm";
import ChangePasswordForm from "@/components/modules/Settings/ChangePasswordForm";
import { getMyProfile } from "@/services/auth";
import { TAuthor } from "@/types";

const Settings = async () => {
    const { data } = await getMyProfile();
    return (
        <div className="mt-6">
            <GerneralInfoForm data={data as TAuthor} />
            <ChangePasswordForm />
        </div>
    );
};

export default Settings;
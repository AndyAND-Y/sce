import ChangeDetailsForm from "@/components/changeDetails/ChangeDetailsForm";
import getCurrentUser from "@/data/getCurrentUser";

export default async function ChangeDetails() {

    const currentUser = await getCurrentUser({});
    return (
        <div className="flex w-full justify-center">
            {/* @ts-ignore */}
            <ChangeDetailsForm user={currentUser} />
        </div>
    )
}
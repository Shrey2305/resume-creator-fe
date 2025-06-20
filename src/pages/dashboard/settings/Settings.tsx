import AccountSettingsSection from "./AccountSettingsSection";
import SecuritySettingsSection from "./SecuritySettingsSection";


export default function SettingsPage(){

    return(
        <>
<div className="mx-auto py-10">
      <AccountSettingsSection />
      <SecuritySettingsSection/>
    </div>
        </>
    )
}
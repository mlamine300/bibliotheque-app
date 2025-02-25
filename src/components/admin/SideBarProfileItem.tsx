import { cn } from "@/lib/utils";

import ProfileImage from "../ProfileImage";
import LogOutButtont from "../LogOutButtont";

interface Props {
  name: string;
  email: string;
  img: string;
  className?: string;
}
function SideBarProfileItem({ name, email, img, className }: Props) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-full w-full border-[1px]  border-light-500 p-2  h-16 items-center",
        className
      )}
    >
      <ProfileImage img={img} />
      <div className="flex flex-col max-md:hidden pl-2 font-ibm-plex-sans overflow-hidden">
        <h3 className="line-clamp-1 text-ellipsis text-base font-medium text-dark-100">
          {name}
        </h3>
        <p className="line-clamp-1  text-xs font-normal text-light-500">
          {email}{" "}
        </p>
      </div>
      <LogOutButtont className="bg-transparent p-0" />
    </div>
  );
}

export default SideBarProfileItem;

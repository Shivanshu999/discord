"use client"
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

 interface NavigationItemProps {
    id: string,
    imageUrl: string,
    name: string
 }
const NavigationItem = ({
    id, 
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick = () => {
        router.push(`/servers/${id}`)
    }
    return ( <ActionTooltip side="right" align="center" label={name}>
      <button  className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]": "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[16px] group-hover:rounded-[8px] transition-all overflow-hidden",
              "bg-primary/10 text-primary rounded-[8px]",
              params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
          )}>
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>);
}
 
export default NavigationItem;
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import './user.css'
import { UilUserPlus } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'


export default function User(props){

    const address = "/Profile/"+ props.Link;
  
  
    return (
      <Link href={address}>
      <Card className={cn("m-10 Post")}>
        <CardHeader>
          <CardTitle>{props.Name}</CardTitle>
          <CardDescription>@{props.Username}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="overflow-y">
              {props.Bio}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex  gap-5">
            
            <div className="flex flex-start gap-1">
            <UilUsersAlt /> 22
            </div>
          </div>
        </CardFooter>
      </Card>
      </Link>
    );
  }
  
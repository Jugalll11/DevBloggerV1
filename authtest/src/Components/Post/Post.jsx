import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import './Post.css';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilThumbsDown } from '@iconscout/react-unicons'
import { UilCommentAltChartLines } from '@iconscout/react-unicons'
import Link from "next/link";


export default function Post(props){

  const address = "/post/"+ props.Link;


  return (
    <Link href={address}>
    <Card className={cn("m-10 Post")}>
      <CardHeader>
        <CardTitle>{props.Title}</CardTitle>
        <CardDescription>User: {props.Author}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="overflow-y">
            {props.Content}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex  gap-5">
          <div className="flex flex-start gap-1">
          <UilThumbsUp /> 10
          </div>
          <div className="flex flex-start gap-1">
          <UilCommentAltChartLines /> {props.comments}
          </div>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
}

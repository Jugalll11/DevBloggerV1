import Link from "next/link";

export default function Comment({ user, content }) {
  const address = "/Profile/" + user;
  return (
    <div className="my-5 flex flex-col bg-beige hover:bg-slate-100 border-2 border-indigo-400 rounded-md">
      <div className="mx-5 my-3  border-b-2 border-slate-500">
        <Link href={address}>
          <h1 className="mx-4 my-1">u/{user}</h1>
        </Link>
      </div>
      <div className="mx-5">
        <p>{content}</p>
      </div>
    </div>
  );
}

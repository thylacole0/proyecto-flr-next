import Link from "next/link";

function Page() {
    return (
        <div>
        <h1>Home Page</h1>
        <p>Solo los logeados pueden ver esta pagina</p>
        <Link href="/main/dashboard">
            <a>Main</a>
        </Link>
        </div>
    );
}
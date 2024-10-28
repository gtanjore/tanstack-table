"use client";

import Link from "next/link";


export default function Home() {
  return (
    <div className="margin-205">
      <main>
        <ol className="usa-list">
          <li><Link className="usa-link" href="/examples/basic">Basic Example</Link></li>
          <li><Link className="usa-link" href="/examples/pagination">Pagination</Link></li>
          <li><Link className="usa-link" href="/examples/swr">useSWR</Link></li>
          <li><Link className="usa-link" href="/examples/swrpagination">useSWR Pagination</Link></li>
        </ol>
      </main>
    </div>
  );
}

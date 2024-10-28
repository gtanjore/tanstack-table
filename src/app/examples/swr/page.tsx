"use client"

import styles from "./page.module.css";
import axios from "axios";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useSWR from "swr";

type People = {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
}

const columnHelper = createColumnHelper<People>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.first_name, {
    id: 'firstname',
    cell: info => <>{info.getValue()}</>,
    header: () => <span>First Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.last_name, {
    id: 'lastname',
    cell: info => <>{info.getValue()}</>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.email, {
    id: 'email',
    cell: info => <>{info.getValue()}</>,
    header: () => <span>Email</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.gender, {
    id: 'gender',
    cell: info => <>{info.getValue()}</>,
    header: () => <span>Gender</span>,
    footer: info => info.column.id,
  }),
]


export default function Home() {

  const fetcher = async (url: string) => {
    const response = await axios(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR("http://localhost:3000/people", fetcher)
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  console.log(data);

  return (
    <div className="margin-205">
      <main>
        <table className="usa-table usa-table--striped">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </main>
    </div>
  );
}


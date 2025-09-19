import { FormData } from "../types";

interface Props {
  data: FormData;
}

export const Tabel: React.FC<Props> = ({ data }) => {
  return (
    <div className="flexible-table-container">
      <table
        border={1}
        cellPadding={8}
        cellSpacing={0}
        className="table table-bordered"
      >
        <thead>
          <tr>
            <td rowSpan={2} className="no-col">
              No
            </td>
            <td rowSpan={2} className="name-col">
              Nama
            </td>
            <td rowSpan={2} className="id-col">
              No. ID Card
            </td>
            <td colSpan={3} className="jam-col">
              Jam
            </td>
            <td rowSpan={2} className="klasif-col">
              Klasifikasi Pekerjaan
            </td>
            <td rowSpan={2} className="jumlah-col">
              Jumlah Lembur yg telah dilaksanakan (konversi)
            </td>
          </tr>

          <tr>
            <td>Mulai</td>
            <td>Selesai</td>
            <td>Jumlah</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className="name-input">{data.nama}</td>
            <td>{data.id}</td>
            <td>{data.mulai}</td>
            <td>{data.selesai}</td>
            <td>{data.jumlah}</td>
            <td>{data.klasifikasi}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

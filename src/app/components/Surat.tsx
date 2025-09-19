import React from "react";
import { Tabel } from "./Tabel";
import { formatDateToIndonesian } from "../utils/dateFormatter";
import { FormData } from "../types";

interface Props {
  formData: FormData;
}

const Surat: React.FC<Props> = ({ formData }) => {
  const { withDays, noDays } = formatDateToIndonesian(formData.tanggal);
  if (!formData || Object.keys(formData).length === 0) return null;

  return (
    <div className="surat-container">
      <div className="px-2 py-3">
        {/* Logo kanan atas */}
        <div
          className="px-3"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img src="/image.png" style={{ height: 55, width: 200 }} />
        </div>

        {/* Judul */}
        <p className="title rapat">SURAT PERMINTAAN KERJA LEMBUR</p>
        <p className="subtitle rapat">
          *Hari Biasa / Sabtu / Minggu / Libur Resmi
        </p>

        {/* Tujuan */}
        <div className="tujuan">
          <p>
            <span className="rapat">Kepada</span>
            <span className="colon">: {formData.pt}</span>
          </p>
          <p style={{ marginTop: 10 }}>
            Mengharap bantuan Saudara untuk menugaskan :
          </p>
        </div>

        {/* Tabel */}
        <div>
          <Tabel data={formData} />
        </div>

        {/* Detail */}
        <div className="detail">
          <p style={{ marginBottom: 10 }}>Untuk melaksanakan kerja lembur :</p>
          <p>
            <span>Hari / Tanggal</span> : {withDays}
          </p>
          <p>
            <span>Lokasi</span> : SRU/IPAL
          </p>
          <p>
            <span>Sifat Pekerjaan</span> : Rutin/Mendesak (urgent/Emergency*)
          </p>
          <p>
            <span>Biaya ditanggung oleh</span> : {formData.pt}
          </p>
          <p>
            <span>Pekerjaan yang dilemburkan</span> : {formData.desc}
          </p>
        </div>

        {/* Uang makan */}
        <div className="uang-makan">
          <span className="label">Uang makan lembur</span>
          <span className="colon">:</span>
          <div className="pilihan">
            <div className="yesno">
              Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No
            </div>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/* Section Head */}
        <div
          className="section-head"
          style={{ display: "table", width: "100%", marginTop: 60 }}
        >
          <div style={{ display: "table-row" }}>
            <div
              style={{ display: "table-cell", width: "50%", textAlign: "left" }}
            >
              <p>Mengetahui,</p>
              <p>** HSE</p>
              <br />
              <br />
              <br />
              <p>....................</p>
            </div>

            <div
              style={{
                display: "table-cell",
                width: "50%",
                textAlign: "right",
              }}
            >
              <p>
                {formData.lokasi}, {noDays}
              </p>
              <p>Section Head SRU & IPAL</p>
              <br />
              <br />
              <br />
              <p>
                <b>{formData.sectionHead}</b>
              </p>
            </div>
          </div>
        </div>

        {/* Keterangan */}
        <div className="keterangan">
          <p>
            <b>Ket *)</b> Coret yang tidak perlu
          </p>
          <ul>
            <li>
              **) Untuk permintaan kerja lembur di daerah battery
              limit/hazardous area
            </li>
            <li>
              Surat Permintaan Kerja Lembur (SPKL) ditujukan kepada PJP &amp;
              Surat Asli diserahkan kepada PJP
            </li>
            <li>
              SPKL yang lebih dari satu orang TKJP hanya jika Pekerjaan yang
              dilemburkan, lokasi dan PJPnya sama
            </li>
            <li>
              Otorisasi kolom tandatangan oleh Fungsi/bagian minimum satu
              tingkat dibawah Section Head/setara tempat
            </li>
            <li>TKJP ditempatkan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Surat;

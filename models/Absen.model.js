import mongoose from "mongoose";

const AbsenSchema = mongoose.Schema(
  {
    nama: String,
    jenis_absen: String,
    tgl_absen: Date,
    status: {
      type: String,
      enum: ["menunggu", "disetujui", "ditolak"],
      default: "menunggu",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Absen", AbsenSchema);

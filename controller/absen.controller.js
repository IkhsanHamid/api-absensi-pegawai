import AbsenModel from "../models/Absen.model.js";

// helper handling error
const messageHelper = (result, status, message) => {
  return {
    message: message,
    status: status,
    result: result,
  };
};

// create absensi
const create = async (req, res) => {
  try {
    // validasi request
    if (!req.body.nama || !req.body.jenis_absen || !req.body.tgl_absen) {
      return res.status(400).send({
        message: "Isian tidak boleh kosong",
      });
    }

    const absen = new AbsenModel({
      nama: req.body.nama,
      jenis_absen: req.body.jenis_absen,
      tgl_absen: new Date(req.body.tgl_absen),
    });
    console.log("absen", absen);
    await absen.save();

    res.send(messageHelper("Insert data berhasil", 202, absen));
  } catch (err) {
    res.send(
      messageHelper("Terjadi kesalahan saat membuat absen", 500, err.message)
    );
  }
};

// findOne Absensi berdasarkan id
const findOne = async (req, res) => {
  try {
    const absen = await AbsenModel.findById(req.params.absenId);
    if (!absen) {
      return res.status(404).send({
        message: "Absen tidak ditemukan dengan id " + req.params.absenId,
      });
    }
    res.send(messageHelper("data berhasil ditampilkan", 202, absen));
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Absen tidak ditemukan dengan id " + req.params.absenId,
      });
    }
    res.send(
      messageHelper(
        "Terjadi kesalahan saat mengambil absen dengan id " +
          req.params.absenId,
        500,
        err.message
      )
    );
  }
};

// find absensi berdasarkan tanggal dan jenis absen
const findByDateAndType = async (req, res) => {
  try {
    const jenis_absen = req.params.jenis_absen;
    const tgl_absen = req.params.tgl_absen;
    const result = await AbsenModel.find({
      jenis_absen: jenis_absen,
      tgl_absen: tgl_absen,
    });
    res.send(messageHelper("data berhasil ditampilkan", 202, result));
  } catch (error) {
    res.send(messageHelper("Terjadi kesalahan saat mengambil absen", 500, error.message));
  }
};

// findAll Absensi
const findAll = async (req, res) => {
  try {
    const absen = await AbsenModel.find();
    res.send(messageHelper("data berhasil ditampilkan", 202, absen));
  } catch (err) {
    res.send(
      messageHelper("Terjadi kesalahan saat mengambil absen", 500, err.message)
    );
  }
};

// update absensi
const update = async (req, res) => {
  try {
    const { nama, jenis_absen, tgl_absen, status } = req.body;

    const updatedAbsensi = await AbsenModel.findByIdAndUpdate(
      req.params.absenId,
      { nama, jenis_absen, tgl_absen, status },
      { new: true }
    );

    if (!updatedAbsensi) {
      return res.status(404).send({
        message: "Absen tidak ditemukan dengan id " + req.params.absenId,
      });
    }

    res.send(messageHelper("absen berhasil di update", 202, updatedAbsensi));
  } catch (error) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat mengupdate absen",
        500,
        error.message
      )
    );
  }
};

// delete absensi
const deleted = async (req, res) => {
  try {
    const deletedAbsen = await AbsenModel.findByIdAndRemove(req.params.absenId);

    if (!deletedAbsen) {
      return res.status(404).send({
        message: "Absen tidak ditemukan dengan id " + req.params.absenId,
      });
    }

    res.send({ message: "Absen berhasil dihapus" });
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Absen tidak ditemukan dengan id " + req.params.absenId,
      });
    }
    res.send(
      messageHelper("Terjadi kesalahan saat mengupdate absen", 500, err.message)
    );
  }
};

//Laporan telat berapa kali dalam 1 bulan
const findLateCount = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: "telat",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });
    const dataLate = await AbsenModel.find({
      jenis_absen: "telat",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    res.send(
      messageHelper("jumlah karyawan yang telat", 202, { count, dataLate })
    );
  } catch (err) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang telat",
        500,
        err.message
      )
    );
  }
};

// Laporan pegawai yang tidak masuk dalam sebulan
const findAbsenCount = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: "tidak masuk",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });
    const dataAbsen = await AbsenModel.find({
      jenis_absen: "tidak masuk",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    res.send(
      messageHelper("jumlah karyawan yang tidak masuk", 202, {
        count,
        dataAbsen,
      })
    );
  } catch (err) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang telat",
        500,
        err.message
      )
    );
  }
};

// Laporan pegawai yang cuti dalam sebulan
const findCutiCount = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: "cuti",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    const cutiData = await AbsenModel.find({
      jenis_absen: "cuti",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    res.send(
      messageHelper("jumlah karyawan yang cuti", 202, { count, cutiData })
    );
  } catch (err) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang cuti",
        500,
        err.message
      )
    );
  }
};

// laporan pegawai yang cuti / izin yang di acc
const findApprove = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "disetujui",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    const cutidanizinData = await AbsenModel.find({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "disetujui",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });
    res.send(
      messageHelper("jumlah karyawan yang cuti/izin di approve", 202, {
        count,
        cutidanizinData,
      })
    );
  } catch (error) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang cuti/izin approve",
        500,
        err.message
      )
    );
  }
};

// laporan pegawai yang cuti / izin yang tidak acc
const findNotApprove = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "ditolak",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    const cutidanizinData = await AbsenModel.find({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "ditolak",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });
    res.send(
      messageHelper("jumlah karyawan yang cuti/izin di approve", 202, {
        count,
        cutidanizinData,
      })
    );
  } catch (error) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang cuti/izin approve",
        500,
        err.message
      )
    );
  }
};

// laporan pegawai yang cuti / izin yang menunggu acc
const findWaitApprove = async (req, res) => {
  try {
    const bulan = parseInt(req.params.bulan);

    const count = await AbsenModel.countDocuments({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "menunggu",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });

    const cutidanizinData = await AbsenModel.find({
      jenis_absen: { $in: ["cuti", "izin"] },
      status: "menunggu",
      tgl_absen: {
        $gte: new Date(2023, bulan - 1, 1),
        $lte: new Date(2023, bulan, 0),
      },
    });
    res.send(
      messageHelper("jumlah karyawan yang cuti/izin di approve", 202, {
        count,
        cutidanizinData,
      })
    );
  } catch (error) {
    res.send(
      messageHelper(
        "Terjadi kesalahan saat menghitung jumlah karyawan yang cuti/izin approve",
        500,
        err.message
      )
    );
  }
};

export default {
  create,
  findAll,
  update,
  findOne,
  deleted,
  findLateCount,
  findAbsenCount,
  findCutiCount,
  findApprove,
  findNotApprove,
  findWaitApprove,
  findByDateAndType
};

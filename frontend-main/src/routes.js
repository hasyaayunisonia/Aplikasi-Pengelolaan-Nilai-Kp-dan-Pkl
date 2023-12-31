// import React from 'react'
import lazyWithRetry from './lazyWithRetry'

// Page
const Dashboard = lazyWithRetry(() => import('./views/dashboard/Dashboard'))
const Profile = lazyWithRetry(() => import('./views/pages/Profile'))

// Pemetaan
const FinalisasiPemetaan = lazyWithRetry(() => import('./views/pemetaan/finalisasi/Finalisasi'))
const Perangkingan = lazyWithRetry(() => import('./views/pemetaan/perangkingan/Perangkingan'))
const HasilPemetaan = lazyWithRetry(() => import('./views/pemetaan/hasilPemetaan'))

// CV
const DetailCV = lazyWithRetry(() => import('./views/rekap/CV/detailCV'))
const RekapCV = lazyWithRetry(() => import('./views/rekap/CV/rekapCV'))
const PengumpulanCV = lazyWithRetry(() => import('./views/rekap/CV/pengumpulanCV'))
const DataCV = lazyWithRetry(() => import('./views/rekap/CV/dataMahasiswa'))
const UpdateCV = lazyWithRetry(() => import('./views/rekap/CV/updateCV'))

// Minat
const DetailMinat = lazyWithRetry(() => import('./views/rekap/minat/detailMinat'))
const RekapMinat = lazyWithRetry(() => import('./views/rekap/minat/rekapMinat'))
const PengumpulanMinat = lazyWithRetry(() => import('./views/rekap/minat/pengumpulanMinat'))
const UpdateMinat = lazyWithRetry(() => import('./views/rekap/minat/updateMinat'))

// Perusahaan
const ListPerusahaan = lazyWithRetry(() => import('./views/rekap/perusahaan/listPerusahaan'))
const UpdatePerusahaan = lazyWithRetry(() => import('./views/rekap/perusahaan/updatePerusahaan'))
const DetailPerusahaan = lazyWithRetry(() => import('./views/rekap/perusahaan/detailPerusahaan'))
const DetailPrerequisitePerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/detailPrerequisite'),
)
const IdentitasPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/identitasPerusahaan'),
)
const PrerequisitePerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/prerequisitePerusahaan'),
)
const UpdatePrerequisite = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/updatePrerequisite'),
)
const TabelPrerequisite = lazyWithRetry(() => import('./views/rekap/perusahaan/tabelPrerequisite'))
const CreatePerusahaan = lazyWithRetry(() => import('./views/rekap/perusahaan/createPerusahaan'))
const TabelPengajuanPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/tabelPengajuanPerusahaan'),
)
const DetailPengajuanPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/detailPengajuanPerusahaan'),
)
const EvaluasiPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/evaluasiPerusahaan'),
)
const FeedbackPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/feedbackPerusahaan'),
)
const DetailEvaluasiPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/detailEvaluasiPerusahaan'),
)
const CardEvaluasiPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/cardEvaluasiPerusahaan'),
)
const FormulirEvaluasiPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/formulirEvaluasiPerusahaan'),
)
const DetailFeedbackPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/detailFeedbackPerusahaan'),
)
const CardFeedbackPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/cardFeedbackPerusahaan'),
)
const FormulirFeedbackPerusahaan = lazyWithRetry(() =>
  import('./views/rekap/perusahaan/formulirFeedbackPerusahaan'),
)

// Pengelolaan
const PengelolaanAkun = lazyWithRetry(() => import('./views/pengelolaan/pengelolaanAkun'))
const PengelolaanKegiatan = lazyWithRetry(() => import('./views/pengelolaan/pengelolaanKegiatan'))
const PengelolaanBobotKriteria = lazyWithRetry(() =>
  import('./views/pengelolaan/pengelolaanBobotKriteria'),
)
const PengelolaanKriteriaPerusahaan = lazyWithRetry(() =>
  import('./views/pengelolaan/pengelolaanKriteriaPerusahaan'),
)
const PengelolaanKompetensi = lazyWithRetry(() =>
  import('./views/pengelolaan/pengelolaanKompetensi'),
)
const PengelolaanAspekPenilaianEvaluasi = lazyWithRetry(() =>
  import('./views/pengelolaan/pengelolaanAspekPenilaianEvaluasi'),
)
const pengelolaanPertanyaanFeedback = lazyWithRetry(() =>
  import('./views/pengelolaan/pengelolaanPertanyaanFeedback'),
)

//Mata Kuliah
const ListMataKuliah = lazyWithRetry(() => import('./views/matakuliah/listMataKuliah'))
const CreateMataKuliah = lazyWithRetry(() => import('./views/matakuliah/createMataKuliah'))
const DetailMataKuliah = lazyWithRetry(() => import('./views/matakuliah/detailMataKuliah'))
const UbahMataKuliah = lazyWithRetry(() => import('./views/matakuliah/ubahMataKuliah'))
const PembobotanNilaiMataKuliah = lazyWithRetry(() =>
  import('./views/matakuliah/pembobotanNilaiMataKuliah'),
)
const RekapitulasiMataKuliah = lazyWithRetry(() =>
  import('./views/matakuliah/rekapitulasiMataKuliah'),
)

// ************** Nilai Seminar **************
const KelolaKriteriaSeminar = lazyWithRetry(() =>
  import('./views/nilaiseminar/kelolaKriteriaSeminar'),
)
const ListPesertaSeminar = lazyWithRetry(() => import('./views/nilaiseminar/listPesertaSeminar'))
const CreateNilaiPesertaSeminar = lazyWithRetry(() =>
  import('./views/nilaiseminar/createNilaiPesertaSeminar'),
)

const RekapitulasiNilaiSeminar = lazyWithRetry(() =>
  import('./views/nilaiseminar/rekapitulasiNilaiSeminar'),
)
//Nilai Industri
const ListNilaiIndustri = lazyWithRetry(() => import('./views/nilaiindustri/listNilaiIndustri'))
const NilaiIndustri = lazyWithRetry(() => import('./views/nilaiindustri/nilaiIndustriById'))

//Test Kafka
const Kafka = lazyWithRetry(() => import('./views/kafka/ListKafka'))

const KelolaAspekEtproTeori = lazyWithRetry(() => import('./views/etikaprofesiteori/kelolaAspek'))
const KelolaPenilaianEtproTeori = lazyWithRetry(()=> import('./views/etikaprofesiteori/KelolaNilaiEtpro'))
const FormPenilaianEtpro = lazyWithRetry(()=> import('./views/etikaprofesiteori/FormPenilaianEtpro'))
const RecapitulationEtpro = lazyWithRetry(() => import('./views/etikaprofesiteori/RecapitulationEtpro'))

const routes = [
  // Page
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', name: 'Profile', component: Profile },

  // *************** Mata Kuliah ***************
  { path: '/mataKuliah', name: 'Mata Kuliah', component: ListMataKuliah, exact: true },
  {
    path: '/mataKuliah/listMatakuliah',
    name: 'List Mata Kuliah',
    component: ListMataKuliah,
    exact: true,
  },
  {
    path: '/mataKuliah/listMatakuliah/tambahMatakuliah',
    name: 'Tambah Mata Kuliah',
    component: CreateMataKuliah,
  },
  {
    path: '/mataKuliah/listMatakuliah/detailMatakuliah/:id',
    name: ':id',
    component: DetailMataKuliah,
  },
  {
    path: '/mataKuliah/listMatakuliah/ubahMatakuliah/:id',
    name: ':id',
    component: UbahMataKuliah,
  },
  {
    path: '/mataKuliah/rekapitulasiNilai',
    name: 'Rekapitulasi Nilai',
    component: RekapitulasiMataKuliah,
    exact: true,
  },

  // ************** Nilai Seminar **************
  { path: '/nilaiSeminar', name: 'Nilai Seminar', component: KelolaKriteriaSeminar, exact: true },
  {
    path: '/nilaiSeminar/kelolaKriteria',
    name: 'Kelola Kriteria Seminar',
    component: KelolaKriteriaSeminar,
  },
  {
    path: '/nilaiSeminar/penilaianSeminar',
    name: 'Penilaian Seminar',
    component: ListPesertaSeminar,
    exact: true,
  },
  {
    path: '/nilaiSeminar/penilaianSeminar/tambahNilaiPeserta',
    name: 'Tambah Nilai Seminar',
    component: CreateNilaiPesertaSeminar,
    exact: true,
  },
  {
    path: '/nilaiSeminar/penilaianSeminar/tambahNilaiPeserta/:id',
    name: ':id',
    component: CreateNilaiPesertaSeminar,
  },
  {
    path: '/nilaiSeminar/rekapitulasiNilaiSeminar',
    name: 'Rekapitulasi Nilai Seminar',
    component: RekapitulasiNilaiSeminar,
  },
  // *************** Nilai Industri ***************
  { path: '/nilaiIndustri', name: 'Nilai Industri', component: ListNilaiIndustri, exact: true },
  { path: '/nilaiIndustri/:id', name: ':id', component: NilaiIndustri},

  // *************** Kafka ***************
  // { path: '/kafka', name: 'Test Kafka', component: Kafka, exact: true },

  // *************** Etpro ***************
  {path: '/etikaProfesiTeori', name: 'Aspek Penilaian EtPro Teori', component: KelolaAspekEtproTeori, exact: true},
  {path: '/etikaProfesiTeori/aspects', name: 'Kelola Aspek Penilaian EtPro Teori', component: KelolaAspekEtproTeori},
  {path: '/etikaProfesiTeori/penilaian', name: 'Kelola Penilaian EtPro Teori', component: KelolaPenilaianEtproTeori, exact:true},
  {
    path: '/etikaProfesiTeori/form/:id',
    name: ':id',
    component:FormPenilaianEtpro,
  },
  {
    path: '/etikaProfesiTeori/recapitulation',
    name: 'Recapitulation Etpro',
    component: RecapitulationEtpro
  },

  // Pemetaan
  { path: '/hasilPemetaan', name: 'Hasil Pemetaan', component: HasilPemetaan, exact: true },

  { path: '/pemetaan', name: 'Pemetaan', component: FinalisasiPemetaan, exact: true },
  {
    path: '/pemetaan/perangkingan',
    name: 'Perangkingan Mahasiswa',
    component: Perangkingan,
    exact: true,
  },
  {
    path: '/pemetaan/finalisasi',
    name: 'Pemilihan Mahasiswa',
    component: FinalisasiPemetaan,
    exact: true,
  },

  // CV
  { path: '/CV', name: 'CV', component: PengumpulanCV, exact: true },
  { path: '/CV/detailCV', name: 'Detail CV', component: DetailCV, exact: true },
  { path: '/CV/detailCV/:id', name: ':id', component: DetailCV },
  { path: '/CV/updateCV', name: 'Ubah Data CV', component: UpdateCV, exact: true },
  { path: '/CV/updateCV/:id', name: ':id', component: UpdateCV },

  { path: '/dataMahasiswa', name: 'Data Mahasiswa', component: DataCV, exact: true },
  { path: '/dataMahasiswa/detailCV', name: 'Detail CV', component: DetailCV, exact: true },
  { path: '/dataMahasiswa/detailCV/:id', name: ':id', component: DetailCV, exact: true },

  { path: '/rekapCV', name: 'Rekap CV', component: RekapCV, exact: true },
  { path: '/rekapCV/detailCV', name: 'Detail CV', component: DetailCV },

  // Minat
  {
    path: '/pemilihanPerusahaan',
    name: 'Pemilihan Perusahaan',
    component: PengumpulanMinat,
    exact: true,
  },
  {
    path: '/pemilihanPerusahaan/detailMinat',
    name: 'Detail Pemilihan Perusahaan',
    component: DetailMinat,
  },
  {
    path: '/pemilihanPerusahaan/updateMinat',
    name: 'Ubah Data Pemilihan Perusahaan',
    component: UpdateMinat,
  },

  { path: '/rekapMinat', name: 'Rekap Minat', component: RekapMinat, exact: true },

  // Perusahaan
  {
    path: '/dataEvaluasiPerusahaan',
    name: 'Data Evaluasi Perusahaan',
    component: CardEvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/dataEvaluasiPerusahaan/formulirEvaluasiPerusahaan',
    name: 'Formulir Evaluasi Perusahaan',
    component: FormulirEvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/dataEvaluasiPerusahaan/formulirEvaluasiPerusahaan/:id',
    name: ':id',
    component: FormulirEvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/dataEvaluasiPerusahaan/detailEvaluasiPerusahaan',
    name: 'Detail Evaluasi Perusahaan',
    component: DetailEvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/dataEvaluasiPerusahaan/detailEvaluasiPerusahaan/:id',
    name: ':id',
    component: DetailEvaluasiPerusahaan,
    exact: true,
  },

  {
    path: '/evaluasiPeserta',
    name: 'Evaluasi Peserta',
    component: EvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/evaluasiPeserta/detailEvaluasi',
    name: 'Detail Evaluasi Peserta',
    component: DetailEvaluasiPerusahaan,
    exact: true,
  },
  {
    path: '/evaluasiPeserta/detailEvaluasi/:id',
    name: ':id',
    component: DetailEvaluasiPerusahaan,
    exact: true,
  },

  {
    path: '/feedbackPerusahaan',
    name: 'Feedback Perusahaan',
    component: FeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/feedbackPerusahaan/detailFeedback',
    name: 'Detail Feedback Perusahaan',
    component: DetailFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/feedbackPerusahaan/detailFeedback/:id',
    name: ':id',
    component: DetailFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/dataFeedbackPerusahaan',
    name: 'Formulir Feedback Pelaksanaan Magang',
    component: CardFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/dataFeedbackPerusahaan/formulirFeedbackPerusahaan',
    name: 'Isi Formulir Feedback Pelaksanaan Magang',
    component: FormulirFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/dataFeedbackPerusahaan/formulirFeedbackPerusahaan/:id',
    name: ':id',
    component: FormulirFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/dataFeedbackPerusahaan/detailFeedbackPerusahaan',
    name: 'Detail Formulir Feedback Pelaksanaan Magang',
    component: DetailFeedbackPerusahaan,
    exact: true,
  },
  {
    path: '/dataFeedbackPerusahaan/detailFeedbackPerusahaan/:id',
    name: ':id',
    component: DetailFeedbackPerusahaan,
    exact: true,
  },

  {
    path: '/formulirKesediaan',
    name: 'Formulir Kesediaan Perusahaan',
    component: PrerequisitePerusahaan,
    exact: true,
  },
  {
    path: '/formulirKesediaan/prerequisite',
    name: 'Prerequisite',
    component: DetailPrerequisitePerusahaan,
    exact: true,
  },
  {
    path: '/formulirKesediaan/prerequisite/:id',
    name: ':id',
    component: DetailPrerequisitePerusahaan,
    exact: true,
  },
  {
    path: '/formulirKesediaan/updatePrerequisite',
    name: 'Ubah Data Prerequisite',
    component: UpdatePrerequisite,
    exact: true,
  },
  {
    path: '/formulirKesediaan/updatePrerequisite/:id',
    name: ':id',
    component: UpdatePrerequisite,
    exact: true,
  },

  {
    path: '/hasilEvaluasiPerusahaan',
    name: 'Hasil Evaluasi Perusahaan',
    component: DetailEvaluasiPerusahaan,
    exact: true,
  },

  { path: '/listPerusahaan', name: 'List Perusahaan', component: ListPerusahaan, exact: true },
  {
    path: '/listPerusahaan/createPerusahaan',
    name: 'Tambah Perusahaan',
    component: CreatePerusahaan,
  },
  {
    path: '/listPerusahaan/detailPerusahaan',
    name: 'Detail Perusahaan',
    component: DetailPerusahaan,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/:id',
    name: ':id',
    component: DetailPerusahaan,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/prerequisite',
    name: 'Prerequisite',
    component: DetailPrerequisitePerusahaan,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/prerequisite/:id',
    name: ':id',
    component: DetailPrerequisitePerusahaan,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/updatePrerequisite',
    name: 'Ubah Data Prerequisite',
    component: UpdatePrerequisite,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/updatePrerequisite/:id',
    name: ':id',
    component: UpdatePrerequisite,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/updatePerusahaan',
    name: 'Ubah Data Perusahaan',
    component: UpdatePerusahaan,
    exact: true,
  },
  {
    path: '/listPerusahaan/detailPerusahaan/updatePerusahaan/:id',
    name: ':id',
    component: UpdatePerusahaan,
    exact: true,
  },

  {
    path: '/pengajuanPerusahaan',
    name: 'Pengajuan Perusahaan',
    component: TabelPengajuanPerusahaan,
    exact: true,
  },
  {
    path: '/pengajuanPerusahaan/detailPengajuanPerusahaan',
    name: 'Detail Pengajuan Perusahaan',
    component: DetailPengajuanPerusahaan,
    exact: true,
  },
  {
    path: '/pengajuanPerusahaan/detailPengajuanPerusahaan/:id',
    name: ':id',
    component: DetailPengajuanPerusahaan,
    exact: true,
  },

  {
    path: '/profilPerusahaan',
    name: 'Profil Perusahaan',
    component: IdentitasPerusahaan,
    exact: true,
  },
  {
    path: '/profilPerusahaan/updatePerusahaan',
    name: 'Ubah Data Perusahaan',
    component: UpdatePerusahaan,
    exact: true,
  },
  { path: '/profilPerusahaan/updatePerusahaan/:id', name: ':id', component: UpdatePerusahaan },

  {
    path: '/prerequisitePerusahaan',
    name: 'Prerequisite Perusahaan',
    component: TabelPrerequisite,
    exact: true,
  },

  // Pengelolaan
  { path: '/pengelolaanAkun', name: 'Pengelolaan Akun', component: PengelolaanAkun },
  { path: '/pengelolaanKegiatan', name: 'Pengelolaan Kegiatan', component: PengelolaanKegiatan },
  {
    path: '/pengelolaanBobotKriteria',
    name: 'Pengelolaan Bobot Kriteria Perangkingan',
    component: PengelolaanBobotKriteria,
    exact: true,
  },
  {
    path: '/pengelolaanKriteriaPerusahaan',
    name: 'Pengelolaan Kriteria Perusahaan',
    component: PengelolaanKriteriaPerusahaan,
    exact: true,
  },
  {
    path: '/pengelolaanKompetensi',
    name: 'Pengelolaan Kompetensi',
    component: PengelolaanKompetensi,
    exact: true,
  },
  {
    path: '/pengelolaanAspekPenilaianEvaluasi',
    name: 'Pengelolaan Aspek Penilaian Evaluasi',
    component: PengelolaanAspekPenilaianEvaluasi,
    exact: true,
  },
  {
    path: '/pengelolaanPertanyaanFeedback',
    name: 'Pengelolaan Pertanyaan Feedback',
    component: pengelolaanPertanyaanFeedback,
    exact: true,
  },
]

export default routes

import { useOrderDetail } from "@/apiStore/orderStore";
import {
  AspectRatio,
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import moment from "moment";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function CarDetail() {
  const router: any = useRouter();
  const { id } = router?.query;
  const { data } = useOrderDetail(id);
  const daysCount = () => {
    if (data?.pickup_date) {
      const start = moment(data?.pickup_date);
      const endDate = moment(data?.dropoff_date);
      return endDate.diff(start, "days");
    } else {
      return 1;
    }
  };
  const toRupiah = (val: number) => {
    const total = val * daysCount();
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Container>
          <div className="max-w-[1208px] mx-auto">
            <Card style={{ paddingBottom: 20 }}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Detail Pemesanan
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Nama Pemesan
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.order_detail.name}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.order_detail.email}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Nomor Ponsel
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.order_detail.phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Detail Sewa
                  </h2>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Lokasi Penjemputan
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.pickup_location.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Lokasi Pengantaran
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.dropoff_location.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tanggal Penjemputan
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.pickup_date}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tanggal Pengantaran
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.dropoff_date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Detail Mobil
                  </h2>
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tipe
                  </label>
                  <div className="mt-2">
                    <div className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {data?.car.name}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-6 text-center">
                  <AspectRatio ratio={16 / 8}>
                    <img
                      src={data?.car.image}
                      alt={data?.car.name}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "var(--radius-2)",
                      }}
                    />
                  </AspectRatio>
                </div>
              </div>
              <Separator my="4" size="4"></Separator>
              <div className="flex items-center justify-between pb-2">
                <Text weight="bold">Total Pembayaran</Text>
                <Text weight="bold" color="blue">
                  {toRupiah(data?.car.day_rate || 0)}
                </Text>
              </div>
            </Card>
          </div>
        </Container>
        <div className="mt-3">
          <Flex direction="column">
            <Button color="blue" size="4" onClick={() => router.push("/")}>
              Kembali ke Beranda
            </Button>
          </Flex>
        </div>
      </main>
    </>
  );
}

CarDetail.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

import { useCarDetail } from "@/apiStore/carStore";
import { useCreateOrder } from "@/apiStore/orderStore";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Select,
  Separator,
  Text,
} from "@radix-ui/themes";
import moment from "moment";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";

export default function CarDetail() {
  const router: any = useRouter();
  const { id, start, end, location } = router?.query;
  const { data } = useCarDetail(id);
  const [state, setState] = useState<any>({
    pickupLocation: "",
    dropoffLocation: "",
    startDate: "",
    endDate: "",
    name: "",
    email: "",
    phone: "",
  });
  const daysCount = () => {
    if (data?.start_date) {
      const start = moment(data?.start_date);
      const endDate = moment(end);
      return endDate.diff(start, "days");
    } else {
      return 1;
    }
  };
  const handleChangeDate = (event: any, name: string) => {
    state[name] = event?.target?.value;
    setState({ ...state });
  };
  const handleInputChange = (event: any, name: string) => {
    state[name] = event?.target.value;
    setState({ ...state });
  };
  const handleChangeDropdown = (value: string, name: string) => {
    state[name] = value;
    setState({ ...state });
  };
  const toRupiah = (val: number) => {
    const total = val * daysCount();
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };
  const { isSuccess, mutate: fetchOrderDetail } = useCreateOrder();
  const handleSubmit = () => {
    fetchOrderDetail(
      {
        car: data?.id,
        order_date: new Date().toJSON().slice(0, 10),
        pickup_date: state?.startDate,
        dropoff_date: state?.endDate,
        pickup_location: state?.pickupLocation,
        dropoff_location: state?.dropoffLocation,
        name: state?.name,
        email: state?.email,
        phone: state?.phone,
      },
      {
        onError(error) {
          toast.error(
            "An error occurred while processing your request. Please try again later."
          );
        },
        onSuccess(data: any) {
          router.push(`/order/${data.order_id}`);
        },
      }
    );
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Container>
          <div className="max-w-[1208px] mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <div className="border-b border-gray-900/10 pb-10">
                  <Card style={{ paddingBottom: 20 }}>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Detail Pemesan
                    </h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p> */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Nama
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => handleInputChange(e, "name")}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3"></div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => handleInputChange(e, "email")}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Nomor Ponsel
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => handleInputChange(e, "phone")}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="pb-10 pt-10">
                  <Card style={{ paddingBottom: 20 }}>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Detail Sewa
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Lokasi Penjemputan
                        </label>
                        <div className="mt-2">
                          <Select.Root
                            defaultValue={state?.pickupLocation}
                            onValueChange={(val) =>
                              handleChangeDropdown(val, "pickupLocation")
                            }
                          >
                            <Select.Trigger style={{ width: "100%" }} />
                            <Select.Content position="popper">
                              <Select.Item value="yogyakarta">
                                Yogyakarta
                              </Select.Item>
                              <Select.Item value="jakarta">Jakarta</Select.Item>
                            </Select.Content>
                          </Select.Root>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Tanggal Penjemputan
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            min={new Date().toJSON().slice(0, 10)}
                            className="border rounded p-1 text-sm border-gray-300 w-full"
                            value={state?.startDate}
                            onChange={(e) => handleChangeDate(e, "startDate")}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Lokasi Pengantaran
                        </label>
                        <div className="mt-2">
                          <Select.Root
                            defaultValue={state?.dropoffLocation}
                            onValueChange={(val) =>
                              handleChangeDropdown(val, "dropoffLocation")
                            }
                          >
                            <Select.Trigger style={{ width: "100%" }} />
                            <Select.Content position="popper">
                              <Select.Item value="yogyakarta">
                                Yogyakarta
                              </Select.Item>
                              <Select.Item value="jakarta">Jakarta</Select.Item>
                            </Select.Content>
                          </Select.Root>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Tanggal Pengantaran
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            min={"2024-02-18"}
                            className="border rounded p-1 text-sm border-gray-300 w-full"
                            value={state?.endDate}
                            onChange={(e) => handleChangeDate(e, "endDate")}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="col-span-4">
                <div className="w-80">
                  <Card>
                    <div className="my-4 text-neutral-700 text-base font-bold capitalize">
                      Sewa Mobil di {data?.location}
                    </div>
                    <Flex direction="column" gap="3">
                      <Flex gap="3" align="center">
                        <Avatar size="5" src={data?.image} fallback="T" />
                        <Box>
                          <Text as="div" size="4" weight="bold">
                            {data?.name}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex direction="column" gap="2">
                      <div className="flex items-center justify-between pt-2 pb-2">
                        <div className="text-stone-500 text-sm font-medium capitalize leading-none">
                          Tanggal Mulai
                        </div>
                        <div className="text-right text-stone-500 text-sm font-medium capitalize leading-none">
                          {data?.start_date}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <div className="text-stone-500 text-sm font-medium capitalize leading-none">
                          Tanggal Selesai
                        </div>
                        <div className="text-right text-stone-500 text-sm font-medium capitalize leading-none">
                          {end}
                        </div>
                      </div>
                      <Separator my="3" size="4"></Separator>
                      <div className="flex items-center justify-between py-4">
                        <div className="text-neutral-700 text-base font-bold capitalize">
                          Harga
                        </div>
                        <div className="text-right text-neutral-700 text-base font-bold capitalize"></div>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <div className="text-stone-500 text-sm font-medium capitalize leading-none">
                          {daysCount()} hari x 1 mobil
                        </div>
                        <div className="text-right text-stone-500 text-sm font-medium capitalize leading-none">
                          {toRupiah(data?.day_rate || 0)}
                        </div>
                      </div>
                      <Separator my="3" size="4"></Separator>
                      <div className="flex items-center justify-between py-4">
                        <div className="text-neutral-700 text-base font-bold capitalize">
                          Biaya Lainnya
                        </div>
                        <div className="text-right text-neutral-700 text-base font-bold capitalize"></div>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <div className="text-stone-500 text-sm font-medium capitalize leading-none">
                          Pajak
                        </div>
                        <div className="text-right text-stone-500 text-sm font-medium capitalize leading-none">
                          Termasuk
                        </div>
                      </div>
                      <Separator my="3" size="4"></Separator>
                      <div className="flex items-center justify-between pb-2">
                        <Text size="3" weight="bold">
                          Total Pembayaran
                        </Text>
                        <Text size="3" weight="bold" color="blue">
                          {toRupiah(data?.day_rate || 0)}
                        </Text>
                      </div>
                    </Flex>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className="mt-3">
          <Flex direction="column">
            <Button color="blue" size="4" onClick={() => handleSubmit()}>
              Lanjutkan
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

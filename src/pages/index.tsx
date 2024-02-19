import { useCarInfo } from "@/apiStore/carStore";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router: any = useRouter();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [state, setState] = useState<any>({
    location: "",
    startDate: today.toJSON().slice(0, 10),
    endDate: tomorrow.toJSON().slice(0, 10),
  });
  let qParam = {
    page: 1,
    startDate: state["startDate"],
    location: state["location"],
  };
  const { data, isLoading, refetch } = useCarInfo(qParam, {
    enabled: false,
  });
  const { results = [], count } = data || {};
  const handleChangeDropdown = (value: string, name: string) => {
    state[name] = value;
    setState({ ...state });
  };
  const handleChangeDate = (event: any, name: string) => {
    state[name] = event?.target?.value;
    setState({ ...state });
  };
  const handleSubmit = () => {
    refetch();
  };
  const reset = () => {
    window.location.reload();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <Flex direction="column">
          <Heading align="center">Sewa Mobil</Heading>
          <Separator my="4" size="4"></Separator>
        </Flex>
        <Card>
          <Flex direction="row" gap="2">
            <Grid>
              <Text size="2" weight="bold">
                Lokasi Penjemputan
              </Text>
              <Select.Root
                defaultValue={state?.location}
                onValueChange={(val) => handleChangeDropdown(val, "location")}
              >
                <Select.Trigger />
                <Select.Content position="popper">
                  <Select.Item value="yogyakarta">Yogyakarta</Select.Item>
                  <Select.Item value="jakarta">Jakarta</Select.Item>
                </Select.Content>
              </Select.Root>
            </Grid>
            <Grid>
              <Text size="2" weight="bold">
                Tanggal Mulai
              </Text>
              <input
                type="date"
                min={"2024-02-18"}
                className="border rounded p-1 mb-1 mt-1 text-sm border-gray-300"
                value={state?.startDate}
                onChange={(e) => handleChangeDate(e, "startDate")}
              />
            </Grid>
            <Grid>
              <Text size="2" weight="bold">
                Tanggal Selesai
              </Text>
              <input
                type="date"
                className="border rounded p-1 mb-1 mt-1 text-sm border-gray-300"
                value={state?.endDate}
                onChange={(e) => handleChangeDate(e, "endDate")}
              />
            </Grid>
            <div className="items-center justify-between mt-6 ml-2">
              <Button size="2" onClick={() => handleSubmit()}>
                <MagnifyingGlassIcon height="16" width="16" />
                Cari Mobil
              </Button>
            </div>
            <div className="items-center justify-between mt-6 ml-2">
              <Button size="2" onClick={() => reset()} color="gray">
                Reset
              </Button>
            </div>
          </Flex>
        </Card>
      </Container>
      {results.length > 0 ? (
        <Container>
          <Text>Menampilkan {count} tipe mobil</Text>
          {results.map((item) => (
            <div key={item.id}>
              <Flex direction="column" gap="3">
                <Card>
                  <Flex gap="3" align="center">
                    <Avatar size="9" src={item.image} fallback="T" />
                    <Box style={{ marginLeft: 30, marginRight: 30 }}>
                      <Text as="div" size="4" weight="bold">
                        {item.name}
                      </Text>
                    </Box>
                    <Box>
                      <Flex direction="column" align="end">
                        <Text color="gray" size="2">
                          Mulai dari
                        </Text>
                        <Text color="blue" size="4" weight="bold">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.day_rate)}
                          <Text color="gray" size="2" weight="regular">
                            /hari
                          </Text>
                        </Text>
                        <Button
                          size="3"
                          color="yellow"
                          onClick={() =>
                            router.push(
                              `/car/${item.id}?start=${state?.startDate}&end=${state?.endDate}&location=${state?.location}`
                            )
                          }
                        >
                          <Text color="blue" weight="bold">
                            Pilih
                          </Text>
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Card>
              </Flex>
            </div>
          ))}
        </Container>
      ) : (
        !isLoading && (
          <Container>
            <Text>Tidak ada mobil yang tersedia</Text>
          </Container>
        )
      )}
    </main>
  );
}

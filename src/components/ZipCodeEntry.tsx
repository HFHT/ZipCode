
import { useState } from 'react';
import { Button, Container, Grid, Text, TextInput, Space, LoadingOverlay, Box } from '@mantine/core';
import { fetchWithNotification } from '../services';

const ZipCodeEntry = () => {
    const [zipCode, setZipCode] = useState('');
    const [isBusy, setIsBusy] = useState(false)

    const handleButtonClick = (value: string) => {
        setZipCode((prev) => prev + value);
    };

    const handleEnter = async () => {
        // Placeholder for the save service call
        const headers = new Headers()
        const optionsDesc = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                zip: zipCode
            })
        };
        setIsBusy(true)
        const res: any = await fetchWithNotification(
            `${import.meta.env.VITE_SCHEDULER_URL}/api/putZipCode`, optionsDesc, { showSuccessNotification: true }
        );
        console.log(res)
        // alert(`Saved Zip Code: ${zipCode}`);
        setZipCode(''); // Reset the input after saving
        setIsBusy(false)

    };

    return (
        <Container size={320}>
            <Box pos="relative">
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Space h="md" />
                <Text size="xl" ta="center" mb="md">
                    Customer Zip Code
                </Text>
                <TextInput value={zipCode} readOnly />
                <Space h="md" />
                <Grid>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <Grid.Col span={4} key={number}>
                            <Button fullWidth onClick={() => handleButtonClick(number.toString())}>
                                {number}
                            </Button>
                        </Grid.Col>
                    ))}
                    <Grid.Col span={6}>
                        <Button fullWidth onClick={() => handleButtonClick('0')}>
                            0
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button fullWidth color="green" onClick={handleEnter} disabled={zipCode.length < 5}>
                            Enter
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={5} mt='xl'>
                        <Button fullWidth onClick={() => setZipCode((prev) => prev.slice(0, -1))}>
                            BackSpace
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={2} mt='xl'>

                    </Grid.Col>
                    <Grid.Col span={5} mt='xl'>
                        <Button fullWidth color="red" onClick={() => setZipCode('')}>
                            Clear
                        </Button>
                    </Grid.Col>
                </Grid>
            </Box>
        </Container>
    );
};

export default ZipCodeEntry;
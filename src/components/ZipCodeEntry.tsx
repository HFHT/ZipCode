
import { useState } from 'react';
import { Button, Container, Grid, TextInput, Space, LoadingOverlay, Box, useMantineTheme, Title } from '@mantine/core';
import { fetchWithNotification } from '../services';
import { useMediaQuery } from '@mantine/hooks';

const ZipCodeEntry = () => {
    const [zipCode, setZipCode] = useState('');
    const [isBusy, setIsBusy] = useState(false)

    const BREAKPOINT = 'xs'
    const theme = useMantineTheme();
    const maxWidth = theme.breakpoints[BREAKPOINT]; // e.g. '48em'
    const isMobileOrTablet = useMediaQuery(`(max-width: ${maxWidth})`);

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
            `${import.meta.env.VITE_SCHEDULER_URL}putZipCode`, optionsDesc
        );
        console.log(res)
        // alert(`Saved Zip Code: ${zipCode}`);
        setZipCode(''); // Reset the input after saving
        setIsBusy(false)

    };
    return (
        <Container size={isMobileOrTablet ? 320 : 1000}>
            <Box pos="relative">
                <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Space h="md" />

                <Title order={isMobileOrTablet ? 3 : 1} ta="center" mb="md">
                    Customer Zip Code
                </Title>
                <TextInput value={zipCode} readOnly />
                <Space h="md" />
                <Grid>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <Grid.Col span={4} key={number}>
                            <Button h={isMobileOrTablet ? '4em' : '8em'} fullWidth onClick={() => handleButtonClick(number.toString())}>
                                <Title order={isMobileOrTablet ? 3 : 1}>{number}</Title>
                            </Button>
                        </Grid.Col>
                    ))}
                    <Grid.Col span={6}>
                        <Button h={isMobileOrTablet ? '4em' : '8em'} fullWidth onClick={() => handleButtonClick('0')}>
                            <Title order={isMobileOrTablet ? 3 : 1}>0</Title>
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button h={isMobileOrTablet ? '4em' : '8em'} fullWidth color="green" onClick={handleEnter} disabled={zipCode.length < 5}>
                            <Title order={isMobileOrTablet ? 3 : 1}>Enter</Title>
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6} mt='xl'>
                        <Button h={isMobileOrTablet ? '4em' : '8em'} fullWidth onClick={() => setZipCode((prev) => prev.slice(0, -1))}>
                            <Title order={isMobileOrTablet ? 5 : 1}>BackSpace</Title>
                        </Button>
                    </Grid.Col>
                    {/* <Grid.Col span={1} mt='xl'>

                    </Grid.Col> */}
                    <Grid.Col span={6} mt='xl'>
                        <Button h={isMobileOrTablet ? '4em' : '8em'} fullWidth color="red" onClick={() => setZipCode('')}>
                            <Title order={isMobileOrTablet ? 3 : 1}>Clear</Title>
                        </Button>
                    </Grid.Col>
                </Grid>
            </Box>
        </Container>
    );
};

export default ZipCodeEntry;
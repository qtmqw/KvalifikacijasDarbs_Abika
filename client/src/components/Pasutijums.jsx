import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@material-tailwind/react";
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 8
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 5
    },
    bulletPoint: {
        width: 10,
        fontSize: 12
    },
    listItemContent: {
        fontSize: 12,
        marginLeft: 5
    }
});

const generateRandomInfo = () => {
    const infoList = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed at orci nisl.',
        'Pellentesque sit amet dapibus metus.',
        'Vestibulum ac nunc ac justo accumsan tristique id eu neque.',
        'Nullam eu consequat tellus, eget commodo massa.',
        'Maecenas sem ex, rutrum sed dolor sit amet, viverra tincidunt sapien.',
        'Etiam eleifend odio sed magna scelerisque, in viverra lectus vestibulum.',
        'Duis sit amet enim elementum, fringilla tortor sed, vulputate felis.',
        'Curabitur pulvinar ipsum sed orci sagittis, non dapibus arcu dapibus.',
        'Donec tincidunt neque id nibh fermentum, non fringilla nisl efficitur.',
    ];
    const randomIndex = Math.floor(Math.random() * infoList.length);
    return infoList[randomIndex];
};

const MyDocument = () => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.heading}>React PDF Example</Text>
                <Text style={styles.paragraph}>This is a sample PDF generated with @react-pdf/renderer.</Text>
                <Text style={styles.heading}>Random Information:</Text>
                <View style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listItemContent}>{generateRandomInfo()}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listItemContent}>{generateRandomInfo()}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listItemContent}>{generateRandomInfo()}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
const DownloadPDFButton = () => (
    <PDFDownloadLink document={<MyDocument />} fileName="Pasūtījums.pdf">
        {({ blob, url, loading, error }) => (
            <div>
                <Button className="bg-orange leading-none  text-sm" disabled={loading}>
                    {loading ? 'Izveido PDF...' : 'apstiprinu'}
                </Button>
            </div>
        )}
    </PDFDownloadLink>
);

const add = () => {
    return (
        <div>
            <DownloadPDFButton />
        </div>
    )
}

export default add
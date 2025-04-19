import React, {useState} from "react";
import CampaignPerformance from "../../components/campaign/campaignPerformance.jsx";
import Content from "../../layout/content";
import Head from "../../layout/head";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    Row,
    CampaignInfoCard
} from "../../components";
import {APICore} from "../../utils/api/APICore.jsx";
import {ArticleData} from "./articleData.jsx";
import {EventData} from "./eventData.jsx";
import {VisitorData} from "./visitorData.jsx";
import {GalleryData} from "./galleryData.jsx";


const performanceOverview = {
    labels : ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "09 Jan", "10 Jan", "11 Jan", "12 Jan","13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan", "28 Jan", "29 Jan", "30 Jan", "31 Jan"],
    dataUnit : 'Leads',
    lineTension : 0,
    datasets : [{
        label : "Social",
        backgroundColor: "transparent",
        borderWidth:2,
        borderColor: "#733AEA",
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#733AEA",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: [0, 20, 44, 60, 60, 60, 60, 60, 60, 95, 138, 126, 110, 90, 170, 250, 290, 280, 270, 260, 245, 225, 205, 230,264, 280, 300, 370, 440, 420, 460]
    }]
};

const Dashboard = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [article, setArticle] = useState('');
    const [event, setEvent] = useState('')
    const [visitor, setVisitor] = useState('');
    const [gallery, setGallery] = useState('');
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle className="page-title">Selamat Datang, {user.name}</BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="g-gs">
                        <Col lg="3" sm="6">
                            <CampaignInfoCard
                                theme="primary"
                                title="Jumlah Artikel"
                                amount={article}
                                change="artikel"
                                direction="up"
                                chart="line"
                                chartData={ArticleData({setArticle})}
                            />
                        </Col>
                        <Col lg="3" sm="6">
                            <CampaignInfoCard
                                theme="info"
                                title="Jumlah Kegiatan"
                                amount={event}
                                change="kegiatan"
                                direction="up"
                                chart="line"
                                chartData={EventData({setEvent})}
                            />
                        </Col>
                        <Col lg="3" sm="6">
                            <CampaignInfoCard
                                theme="warning"
                                title="Jumlah Pengunjung"
                                amount={visitor}
                                change="pengunjung"
                                direction="up"
                                chart="bar"
                                chartData={VisitorData({setVisitor})}
                            />
                        </Col>
                        <Col lg="3" sm="6">
                            <CampaignInfoCard
                                theme="danger"
                                title="Jumlah Galeri"
                                amount={gallery}
                                change="galeri"
                                direction="up"
                                chart="line"
                                chartData={GalleryData({setGallery})}
                            />
                        </Col>
                        <Col xxl="8" lg="7">
                            <CampaignPerformance
                                title="Trafik Pengunjung"
                                chartData={performanceOverview}
                            />
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Dashboard;

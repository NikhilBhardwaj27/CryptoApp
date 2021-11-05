import React,{useState} from 'react';
import {Select,Typography,Row ,Col,Avatar ,Card} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import Loader from '../Loader';



const {Text,Title} = Typography;
const {Option} = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({simplified}) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory,count:simplified ? 6 : 70})
    const { data} = useGetCryptosQuery(100);


    console.log(cryptoNews)
    
    if(!cryptoNews?.value) return <Loader/>;

    const noNews = () =>  (
        <h3>No News as of now !!!</h3>
    )
    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value)=> setNewsCategory(value)}
                        filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                       <Option value="Cryptocurrency">Cryptocurrency</Option> 
                       {data?.data?.coins.map((coin,i)=> (<Option value={coin.name} key={i}>{coin.name}</Option>))}
                       
                    </Select>
                </Col>
            )}

            {cryptoNews.value.length === 0 ? noNews() :cryptoNews.value.map((news,i)=>(
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img style={{'maxWidth':'200px','maxHeight':'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="not loaded" />
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0,100)}...`: news.description}
                            </p>
                            <div className="provider-container">
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                                <Text className="provider-name">{news.provider[0].name}</Text>    
                            </div>
                            <Text >{moment(news.datePublisher).startOf('ss').fromNow()}</Text>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News

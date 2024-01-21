import {FC, useState} from 'react'
import {Col, Row, Spinner} from 'react-bootstrap'
import {getAlpinistsByCountry} from './modules/get-alpinists-by-country'
import {IAlpinists} from "./../models/alpinist"
import {useEffect} from 'react';
import InputField from './components/InputField/InputField'
import AlpinistCard from './components/AlpinistCard/AlpinistCard'
import './AlpinistsPage.css'
import {Helmet} from 'react-helmet';
// import {deleteAlpinist} from "./modules/delete-alpinist.ts";

const AlpinistsPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)

    const [alpinists, setAlpinists] = useState<IAlpinists[]>([])

    const handleSearch = async () => {
        await setLoading(true)
        const {alpinists} = await getAlpinistsByCountry(searchValue)
        let filtered = alpinists

        if (searchValue != '') {
            filtered = alpinists.filter((a) => a.country?.includes(searchValue)) || alpinists
        }
        await setAlpinists(filtered)
        await setLoading(false)
    }

    // const handleDeleteAlpinist = (id: string) => {
    //     return async () => {
    //         await deleteAlpinist(id)
    //         await handleSearch()
    //     }
    // }


    useEffect(() => {
        handleSearch()
    }, []);

    return (
        <div>
            <Helmet>
                <style>{'body { font-family: \'Roboto Slab\', serif; background-color: #D2DBDD; }'}</style>
            </Helmet>

            <div className={`my-container ${loading && 'containerLoading'}`}>
                {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

                <InputField
                    value={searchValue}
                    setValue={(value) => setSearchValue(value)}
                    loading={loading}
                    onSubmit={handleSearch}
                />

                {!alpinists.length && <div>
                    <h1>К сожалению, пока ничего не найдено :(</h1>
                </div>}

                <Row xs={4} md={4} className="g-4">
                    {alpinists.map((item, index) => (
                        <Col key={index}>
                            <AlpinistCard {...item}/>
                        </Col>
                    ))}
                </Row>

            </div>
        </div>
    )
}

export default AlpinistsPage

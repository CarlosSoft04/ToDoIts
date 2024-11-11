const Filter = ({filter, setFilter, setSort}) => { //Componente Filter que recebe esses tres parametros
    return (
        <div className="filter">
            <h2>Filtrar</h2>
            <div className="flter-options">
                <div>
                    <p>Status</p>
                    
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All"></option>
                        <option value="Completed">Completas</option>
                        <option value="Incomplete">Incompletas</option>
                    </select>
                </div>
                <p>Ordem Alfabetica</p>
                <div>
                    <button className="asc" onClick={() => setSort("Asc")}>Asc</button>
                    <button className="desc" onClick={() => setSort("Desc")}>Desc</button>
                </div>
            </div>
        </div>
    )
}

export default Filter
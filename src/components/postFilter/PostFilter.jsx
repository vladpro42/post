import { Input } from "../UI/input/Input"
import { Select } from "../UI/select/Select"



export const PostFilter = ({ filter, setFilter }) => {
    return <div>
        <Input
            placeholder={'searching...'}
            value={filter.query}
            onChange={e => setFilter({ ...filter, query: e.target.value })}
        />
        <Select
            value={filter.sort}
            onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
            defaultValue={'Сортировка по'}
            options={[
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По описанию' }
            ]}
        />
    </div>
}
interface IUpdateRentalDTO {
    car_id: string;
    id: string,
    end_date: Date,    
    expected_return_date: Date,
    total: number
}

export { IUpdateRentalDTO }
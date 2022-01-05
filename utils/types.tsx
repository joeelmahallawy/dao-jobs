export type Dao = {
    id: string
    nameOfDao: string
    discordServerExists: string
    discordPopulation: string
    discordLink: string
    twitterUrl: string
    daoGoals: string
    briefDescription: string
}
export type JobPostingInputValues = {
    jobTitle: string
    jobDescription: string
    tokenExists: boolean
    tokenSymbol?: string
    tokenPrice?: number
    tokenAddress?: string
    currencyOfCompensation: string
    approximateSalary: string
    salaryNegotiable: boolean
}
export type JobPostingValues = {
    id: string
    daoId: number
    jobTitle: string
    jobDescription: string
    tokenExists: boolean
    tokenSymbol?: string
    tokenPrice?: number
    tokenAddress?: string
    currencyOfCompensation: string
    approximateSalary: string
    salaryNegotiable: boolean
    employerID: string
}
export type Daos = {
    employerId: string
    employerName: string
    employerProfilePic: string
    nameOfDao: string
    discordServerExists: boolean
    discordLink: string
    discordPopulation: number
    twitterUrl: string
    daoGoals: string
    briefDescription: string
}
export type Jobs = {
    jobTitle: string
    jobDescription: string
    tokenExists: boolean
    tokenSymbol: string
    tokenPrice: number
    tokenAddress: string
    currencyOfCompensation: string
    approximateSalary: string
    salaryNegotiable: boolean
    employerID: string
}

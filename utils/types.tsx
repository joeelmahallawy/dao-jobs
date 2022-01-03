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
    discordContact: string
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
    discordContact: string
}

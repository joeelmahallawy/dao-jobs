import { supabase } from '../lib/supabase'

const SignIn = async () =>
    await supabase.auth.signIn(
        {
            provider: 'discord',
        },
        {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}registration`,
        },
    )

export default SignIn

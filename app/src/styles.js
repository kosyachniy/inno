import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
    actionButton: {
        borderRadius: '10px',
        fontSize: '15px',
        height: '56px',
        backgroundColor: '#fde000',
        padding: '0 36px',
        cursor: 'pointer',
        border: '0',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
		'&:hover': {
            backgroundColor: '#eed500',
        },
    },
}))

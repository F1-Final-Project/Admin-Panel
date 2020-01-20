import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    input: {
        fontSize: '18px',
        display: 'flex',
        '& label': {
            color: '#7a6c5b',
        },
        '& .MuiInput-underline:before': {
            borderBottomWidth: '1px',
            borderBottomColor: '#7a6c5b',
        },
        '& .MuiInputBase-input': {
            color: '#7a6c5b',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomWidth: '1px',
            borderBottomColor: '#E9C294',
        },
        '&  .MuiInput-underline:after': {
            borderBottomColor: '#E9C294',
        },
        '&  .MuiFormLabel-root.Mui-focused': {
            color: '#E9C294',
        },

    },

    growBtn: {
        transformOrigin: '2000% 50%',
        width: 'inherit',
        backgroundColor: '#212121',
        backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
        borderRadius: 3,
        height: 48,
        marginTop: '50px',
        borderColor:'#82796d',
        '&:hover': {
            backgroundImage: 'none',
            boxShadow: '8px 8px 8px 6px rgba(0,0,0,0.3)',
            '& .MuiButton-label': {
                color: '#E9C294',
            },
        },
        '& .MuiButton-label': {
            color: '#82796d',
            borderWidth: '1',
            borderColor: '#7a6c5b',
        },
        '&.Mui-disabled': {
            borderColor: '#7a6c5b',
        },

    },
    form:{
        width: '100%',
        '& .MuiSelect-select':{
            backgroundColor: 'transparent',
        },

    },
    label: {
        marginTop: 16,
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '& .MuiSelect-selectMenu.MuiSelect-selectMenu': {
            color: '#7a6c5b',
            width: 100,
        },
        '& .MuiSelect-icon': {
            color: '#E9C294',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#E9C294',
        },
    },
    select: {
        color: '#212121',
        '&:hover': {
            color: '#E9C294'
        }
    }
}));






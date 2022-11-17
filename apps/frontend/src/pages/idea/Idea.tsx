import { IIdea, IUserData } from '@galadrim-tools/shared'
import {
    Box,
    BoxProps,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { green, red } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { AppStore } from '../../globalStores/AppStore'
import { findUserReaction } from './IdeasStore'
import { getNameOfUsers } from '../saveur/restaurants/ratingsFunctions'
import { getUsersIdWithSpecificReaction } from './helper'

const getReactions = (idea: IIdea, userId: IUserData['id']) => {
    const numberOfReaction = idea.reactions.length

    const numberOfUpvote = idea.reactions.filter((r) => r.isUpvote).length
    const numberOfDownvote = numberOfReaction - numberOfUpvote

    const currentUserReaction = findUserReaction(idea, userId)?.isUpvote ?? null

    const result = {
        numberOfUpvote,
        numberOfDownvote,
        currentUserReaction,
    }

    return result
}

const IconReactionWrapper = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Idea = observer<{ idea: IIdea; userId: IUserData['id'] }>(({ idea, userId }) => {
    const { ideaStore, users } = AppStore
    const { numberOfUpvote, numberOfDownvote, currentUserReaction } = getReactions(idea, userId)

    return (
        <Card style={{ cursor: 'pointer', maxWidth: 345 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {idea.text}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tooltip title={getNameOfUsers(getUsersIdWithSpecificReaction(idea, false), users)}>
                    <IconReactionWrapper sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => ideaStore.setReaction(idea.id, userId, false)}>
                            <ThumbDownIcon
                                sx={{ color: currentUserReaction === false ? red[700] : undefined }}
                            />
                        </IconButton>
                        {numberOfDownvote}
                    </IconReactionWrapper>
                </Tooltip>
                <Tooltip title={getNameOfUsers(getUsersIdWithSpecificReaction(idea, true), users)}>
                    <IconReactionWrapper>
                        <IconButton onClick={() => ideaStore.setReaction(idea.id, userId, true)}>
                            <ThumbUpIcon
                                sx={{
                                    color: currentUserReaction === true ? green[500] : undefined,
                                }}
                            />
                        </IconButton>
                        {numberOfUpvote}
                    </IconReactionWrapper>
                </Tooltip>
            </CardActions>
        </Card>
    )
})

export default Idea
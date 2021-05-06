import React from 'react';
import { useSelector } from 'react-redux';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  ConversationList,
  Search,
  Conversation,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";

const Dashboard = () => {
    const data = useSelector(state => state.user);

    if (!data?.user) return null;
    const { user } = data;
    console.log(user, ">>>>");

    const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

    return (
        <div style={{
            height: "600px",
            position: "relative"
        }}>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={false}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Lilly" status="available" />
                        </Conversation>

                        <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Joe" status="dnd" />
                        </Conversation>

                        <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                            <Avatar src={iconUrl} name="Emily" status="available" />
                        </Conversation>

                        <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                            <Avatar src={iconUrl} name="Kai" status="unavailable" />
                        </Conversation>

                        <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Akane" status="eager" />
                        </Conversation>

                        <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Eliot" status="away" />
                        </Conversation>

                        <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                            <Avatar src={iconUrl} name="Zoe" status="dnd" />
                        </Conversation>

                        <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Patrik" status="invisible" />
                        </Conversation>

                    </ConversationList>
                </Sidebar>

                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Back />
                        <Avatar src={iconUrl} name="Zoe" />
                        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
                        <ConversationHeader.Actions>
                            <VoiceCallButton />
                            <VideoCallButton />
                            <InfoButton />
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>

                        <MessageSeparator content="Saturday, 30 November 2019" />

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "single"
                        }}>
                            <Avatar src={iconUrl} name="Zoe" />
                        </Message>

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "single"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "first"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "normal"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "normal"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "last"
                        }}>
                            <Avatar src={iconUrl} name="Zoe" />
                        </Message>

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "first"
                        }} />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "normal"
                        }} />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "normal"
                        }} />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "last"
                        }} />

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "first"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "last"
                        }}>
                            <Avatar src={iconUrl} name="Zoe" />
                        </Message>
                    </MessageList>
                    <MessageInput placeholder="Type message here" value={""} onChange={val => {}} onSend={() => {}} />
                </ChatContainer>

                <Sidebar position="right">
                    <ExpansionPanel open title="INFO">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="LOCALIZATION">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="MEDIA">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="SURVEY">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="OPTIONS">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                </Sidebar>
            </MainContainer>
        </div>
    )
}

export default Dashboard;